import dal from "../2-utils/dal";
import TeamModel from "../4-models/team-model";


async function getAllTeams(): Promise<TeamModel[]> {
    const sql = `SELECT * FROM teams`;
    const teams = await dal.execute(sql);
    return teams;
}


export default {
    getAllTeams
};