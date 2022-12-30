import { User } from './user.model';
import { Token } from '../../token';
import ValidateService from '../../validation';
import { Request, Response } from 'express';
/**
 * LOGIN USER
 * @param {request} req
 * @param {response} res
 * @returns
 */

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    // const data = decryptData(req.body.data, config.SECRET.crypto)

    let error = {};
    const result = ValidateService.login({ email, password });
    if (result.error) {
        error = {
            status: 0,
            type: 'Validation',
            message: result.error.details[0].message,
        };
        return res.status(201).send({ ...error });
    }
    try {
        const user = await User.findOne({ email }).exec();

        if (!user) {
            error = {
                status: 0,
                type: 'email',
                message: 'Email not found !',
            };
            return res.status(201).send({ ...error });
        }

        const match = user.checkPassword(password);

        if (!match) {
            error = {
                status: 0,
                type: 'password',
                message: 'Check your password',
            };

            return res.status(200).send({ ...error });
        }

        const token = Token.generate(user);

        return res
            .status(201)
            .send({ status: 1, user, tokens: { access: { token } } });
    } catch (e) {
        console.error(e);
        res.status(500).end();
    }
};

/**
 * REGISTER USER
 * @param {request} req
 * @param {response} res
 * @returns
 */
export const register = async (req: Request, res: Response) => {
    const { username ,email, password } = req.body;
    let error = {};
    const result = ValidateService.register({ username, email, password });
    if (result.error) {
        error = {
            status: 0,
            type: 'Validation',
            message: result.error.details[0].message,
        };
        return res.status(201).send({ ...error });
    }
    try {
        const user = await User.findOne({ email })
            .select('email')
            .exec();

        if (user) {
            error = {
                status: 0,
                type: 'email',
                message: 'Email already exist ! ',
            };
            res.status(200).send(error).end();
        }

        const newuser = await User.create(req.body);

        const token = Token.generate(newuser);

        return res.status(201).send({ status: 1, token });
    } catch (e) {
        console.log(e);
        return res.status(500).end();
    }
};
