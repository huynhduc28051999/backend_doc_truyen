import { Entity, ObjectIdColumn, Column } from 'typeorm';
import * as uuid from 'uuid'
import * as moment from 'moment'
import { Expose, plainToClass } from 'class-transformer'

@Entity('User')
export class StoriesEntity {
	@Expose()
	@ObjectIdColumn()
	_id: string

	@Expose()
	@Column()
	name: string

	@Expose()
	@Column()
	tags: string[]

	@Expose()
	@Column()
	author: string

	@Expose()
	@Column()
	artist: string

	@Expose()
	@Column()
	status: string

	@Expose()
	@Column()
	avatar: string

  @Expose()
	@Column()
	overview: string

  @Expose()
	@Column()
	note: string

  @Expose()
	@Column()
	otherName: string

	@Expose()
	@Column()
	createdAt: number

	@Expose()
	@Column()
	updatedAt: number

	constructor(args: Partial<StoriesEntity>) {
		if(args) {
			Object.assign(
				this,
				plainToClass(StoriesEntity, args, {
					excludeExtraneousValues: true
				})
			)
			this._id = uuid.v4()
			this.createdAt = this.createdAt || moment().valueOf()
			this.updatedAt = moment().valueOf()
		}
	}
}
