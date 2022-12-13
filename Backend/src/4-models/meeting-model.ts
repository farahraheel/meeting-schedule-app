enum Rooms {
    RED = "red",
    BLUE = "blue",
    GREEN = "green",
}

class MeetingModel {
    public id: number;
    public teamId: number;
    public startTime: string;
    public endTime: string;
    public description: string;
    public room: Rooms;

    public constructor(meeting: MeetingModel) {
        this.id = meeting.id;
        this.teamId = meeting.teamId;
        this.startTime = meeting.startTime;
        this.endTime = meeting.endTime;
        this.description = meeting.description;
        this.room = meeting.room;
    }
}

export default MeetingModel;