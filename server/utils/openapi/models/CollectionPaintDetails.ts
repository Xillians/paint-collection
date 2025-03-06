/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaintOutputDetails } from './PaintOutputDetails';
export type CollectionPaintDetails = {
    /**
     * A URL to the JSON Schema for this object.
     */
    readonly $schema?: string;
    created_at: string;
    id: number;
    paint: PaintOutputDetails;
    quantity: number;
    updated_at: string;
};

