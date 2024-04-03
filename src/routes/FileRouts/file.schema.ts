import * as Joi from 'joi'

const fileSchema: Record<string, Joi.Schema> = {
	idValidation: Joi.object().keys({
		id: Joi.number().required(),
	}),
}

export default fileSchema
