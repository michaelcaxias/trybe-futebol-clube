export const userFindOneMock = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  password: '123456',
  email: 'admin@admin.com'
}

export const mockResponseLogin = {
  user: {
    id: 1,
    username: "Admin",
    role: "admin",
    email: "admin@admin.com"
  },
  token: "123.456.789"
}

export const clubsGetMock = [
  {
		id: 1,
		clubName: "Avaí/Kindermann"
	},
	{
		id: 2,
		clubName: "Bahia"
	},
	{
		id: 3,
		clubName: "Botafogo"
	}
]