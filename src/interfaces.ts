export interface IJob {
	id: number;
	title: string;
	company: string;
	url: string;
	description: string;
	skillList: string;
	pulicationDate: string;
}

export interface ISkill {
	id: number;
	idCode: string;
	name: string;
	url: string;
	description: string;
}