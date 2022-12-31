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
            // REQUIRES A GIVEN STRING VALUE
            username: Joi.string().required(),
            // VALIDATE EMAIL ADRESS
            email: Joi.string().email().required(),
            // VALIDATE PASSWORD MIN 4 CARACTER
            password: Joi.string().required().min(4),
            // FORCE PASSWORD TO MATCH
            password_confirmation: Joi.any().equal(Joi.ref('password'))
            .required()
            .label('Confirm password')
            .options({ messages: { 'any.only': '{{#label}} does not match'} })
            
        });
        return registerSchema.validate(registerData);
    }
}

export default ValidateService;
