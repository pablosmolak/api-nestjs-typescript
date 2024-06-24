import { IsDateString, IsEnum, IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator"
import { DefaultDeserializer } from "v8"

export enum taskStatusEnum{
    TO_DO ='TO_DO',
    IN_PROGRESS = "IN_PROGRESS",
    DONE = 'DONE'
}

export class TaskDto{
    @IsUUID()
    @IsOptional()
    id: string

    @IsString()
    @MinLength(3)
    @MaxLength(256)
    title: string
    
    @IsString()
    @MinLength(3)
    @MaxLength(512)
    description: string

    @IsEnum(taskStatusEnum)
    @IsOptional()
    status: string

    @IsDateString()
    expirationDate: Date
}

export interface findAllParameters {
    title: string
    status: string
}