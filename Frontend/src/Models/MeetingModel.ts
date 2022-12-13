import TeamModel from "./TeamModel";

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

}

export default MeetingModel;