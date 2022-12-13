import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import MeetingModel from "../../../Models/MeetingModel";
import TeamModel from "../../../Models/TeamModel";
import meetingsService from "../../../Services/MeetingsService";


import "./AddMeeting.css";

function AddMeeting(): JSX.Element {

    const navigate = useNavigate();

    const [teams, setTeams] = useState<TeamModel[]>([]);

    const { register, handleSubmit } = useForm<MeetingModel>();

    useEffect(() => {
        meetingsService.getAllTeams()
            .then(teams => setTeams(teams))
            .catch(err => alert(err.message));
    }, []);

    async function send(meeting: MeetingModel) {
        if (new Date(meeting.startTime).getTime() > new Date(meeting.endTime).getTime()) {
            return alert(
                "end date can't be in the past!",
            )
        }
        try {
            await meetingsService.addMeeting(meeting);
            alert("Meeting has been added");
            navigate("/list");
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    return (
        <div className="AddMeeting">
            <p>Add meeting</p>
            <form onSubmit={handleSubmit(send)}>

                <label>Select Team: </label>
                <select defaultValue="" {...register("teamId")}>
                    <option disabled value="">Select Team</option>
                    {teams.map(t =>
                        <option key={t.id} value={t.id}>
                            {t.name}
                        </option>)}
                </select>

                <label>Start of meeting: </label>
                <input type="datetime-local" {...register("startTime")} required />

                <label>End of meeting: </label>
                <input type="datetime-local" {...register("endTime")} required />

                <label>Description: </label>
                <input type="text" {...register("description")} required min="0" max="100" />

                <label>Meeting room: </label>
                <input type="text" {...register("room")} required min="0" max="100" />
                <button>Add</button>

            </form>
        </div>
    );
}

export default AddMeeting;