import { model, Model, models, ObjectId, Schema, Types } from "mongoose";

export interface EventType {
	userId: ObjectId;
	startTime: Date;
	endTime: Date;
	type: string;
	serialize(): any;
}

const eventSchema = new Schema({
	userId: Types.ObjectId,
	startTime: Date,
	endTime: Date,
	type: String,
});

eventSchema.methods.serialize = function() {
	return {
		id: this._id.toString(),
		userId: this.userId,
		startTime: this.startTime,
		endTime: this.endTime,
		type: this.type
	};
};

export const Event: Model<EventType> = models.Event || model('Event', eventSchema);