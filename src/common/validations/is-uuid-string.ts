import {registerDecorator, ValidationOptions} from 'class-validator';

import validator from 'validator';

export function IsUuidString(validationOptions?: ValidationOptions) {
    return (object: Object, propertyName: string) => {
        registerDecorator({
            name: 'IsUuidString',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                defaultMessage(): string {
                    return `${propertyName} is not uuid`;
                },
                validate(value: string) {
                    return validator.isUUID(value);
                },
            },
        });
    };
}
