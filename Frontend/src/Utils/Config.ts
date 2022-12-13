class Config {
    public meetingsUrl = "http://localhost:3001/api/meetings";
    public teamsUrl = "http://localhost:3001/api/teams";

}

const appConfig = new Config(); // Singleton

export default appConfig;
