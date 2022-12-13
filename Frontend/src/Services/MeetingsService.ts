import axios from "axios";
import MeetingModel from "../Models/MeetingModel";
import TeamModel from "../Models/TeamModel";
import appConfig from "../Utils/Config";

class MeetingsService {

    public async getAllTeams(): Promise<TeamModel[]> {
        const response = await axios.get<TeamModel[]>(appConfig.teamsUrl);
        const teams = response.data;
        return teams;
    }

    public async getMeetingsByTeams(teamId: number): Promise<MeetingModel[]> {
        const response = await axios.get<MeetingModel[]>(appConfig.meetingsUrl + '/' + teamId);
        const meetings = response.data;
        return meetings;
    }

    public async addMeeting(meeting: MeetingModel): Promise<void> {
        await axios.post<MeetingModel>(appConfig.meetingsUrl, meeting);
    }

    public async deleteMeeting(id: number): Promise<void> {
        await axios.delete(appConfig.meetingsUrl + id);
    }
}

const meetingsService = new MeetingsService();

export default meetingsService;