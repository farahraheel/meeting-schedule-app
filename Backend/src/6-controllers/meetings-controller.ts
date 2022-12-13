
import express, { Request, Response, NextFunction } from "express";
import MeetingModel from "../4-models/meeting-model";
import meetingsLogic from "../5-logic/meetings-logic";

const router = express.Router();

// GET http://localhost:3001/api/meetings/:teamId
router.get("/meetings/:teamId", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const teamId = +request.params.teamId;
        const res = await meetingsLogic.getAllMeetingsByTeams(teamId);
        response.json(res);
    }
    catch (err: any) {
        next(err);
    }
});

// POST http://localhost:3001/api/meetings
router.post("/meetings", async (request: Request, response: Response, next: NextFunction) => {
    try{
        const meeting = new MeetingModel(request.body);
        const addMeeting = await meetingsLogic.addMeeting(meeting);
        return response.status(201).json(addMeeting);
    }
    catch(err: any) {
        next(err);
    }
});

// DELETE http://localhost:3001/api/meetings/:id
router.delete("/meetings/:id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        await meetingsLogic.deleteMeeting(id);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;