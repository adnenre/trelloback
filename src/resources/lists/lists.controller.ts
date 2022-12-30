import { Request, Response } from 'express';
import { Lists } from './lists.model';

export const load = async (_req : Request, res:Response) => {
    const lists = await Lists.find();
    return res.status(200).send(lists);
};

export const save = async (req : Request, res:Response) => {
    const { lists } = req.body;
    try {
        for (let i = 0; i < lists.length; i++) {
            let filter = { id: lists[i].id };
            let update = { title: lists[i].title, tasks: lists[i].tasks };
            await Lists.findOneAndUpdate(filter, update, {
                upsert: true,
                new: true,
            });
        }
        return res.json({ success: true });
    } catch (e) {
        console.log(e);
        return res.json({ success: false });
    }
};
