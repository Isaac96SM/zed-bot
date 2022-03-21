type Member = {
	username: string;
	profile: {
		gameNicks: {
			id: string; // LoL: DSqvAwvMpYtH9Ccdj
			nick: string;
		}[];
	};
};

type Team = {
	equipo: {
		name: string;	
	};
	miembros: Member[];
};

export type CTTeamResponse = {
	status: string;
	returnData: Team;
};