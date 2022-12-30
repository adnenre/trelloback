import Joi from 'joi';
import { Ilogin ,Iregister} from '../interfaces/IAuthentication';

class ValidateService {
     static login(loginData: Ilogin) {
        const loginShcema = Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required().min(4),
        });
        return loginShcema.validate(loginData);
    }

     static register(registerData: Iregister) {
        const registerSchema = Joi.object().keys({
            username: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required().min(4),
        });
        return registerSchema.validate(registerData);
    }
}

export default ValidateService;
