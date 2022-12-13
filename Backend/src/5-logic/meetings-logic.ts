import dal from "../2-utils/dal";
import { OkPacket } from "mysql";
import MeetingModel from "../4-models/meeting-model";
import { ResourceNotFoundErrorModel } from "../4-models/error-models";


async function getAllMeetingsByTeams(teamId: number): Promise<MeetingModel[]> {
    const sql = `SELECT M.id,
    M.teamId,
    DATE_FORMAT(startTime, '%d/%m/%Y %T') AS startTime,
    DATE_FORMAT(endTime, '%d/%m/%Y %T') AS endTime,
    M.description,
    M.room,
    T.name         
    FROM meetings AS M
    JOIN teams AS T
    ON M.teamId = T.id
    WHERE M.teamId = ?`;

    const teams = await dal.execute(sql, [teamId]);
    return teams;
}

async function addMeeting(meeting: MeetingModel): Promise<MeetingModel> {
    const sql = `INSERT INTO meetings VALUES(
        DEFAULT,
        ?,
        ?,
        ?,
        ?,
        ?
    )`;
    const info: OkPacket = await dal.execute(sql, [meeting.teamId, meeting.startTime, meeting.endTime, meeting.description, meeting.room]);
    meeting.id = info.insertId;
    return meeting;
}

async function deleteMeeting(meetingId: number): Promise<void> {
    const sql = `DELETE FROM meetings WHERE id = ?`;
    const info: OkPacket = await dal.execute(sql, [meetingId]);
    if (info.affectedRows === 0) throw new ResourceNotFoundErrorModel(meetingId);
}

export default {
    getAllMeetingsByTeams,
    addMeeting,
    deleteMeeting
};