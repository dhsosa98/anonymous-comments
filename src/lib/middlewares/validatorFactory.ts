import Ajv from 'ajv';
import { JTDDataType, AnySchemaObject } from 'ajv/dist/core';
import { NextApiRequest, NextApiResponse } from 'next';

export function validatorFactory(schema: AnySchemaObject) {

  const ajv = new Ajv();
  type Schema = JTDDataType<AnySchemaObject>;
  const validate = ajv.compile<Schema>(schema);

  return (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const isValid = validate(req.body);
    if (isValid) {
      return next();
    } else {
      const error = validate.errors;
      return res.status(400).json({
        error: {
          messages: error?.map((err) => err.message) || `Invalid request body`,
        },
      });
    }
  };
}