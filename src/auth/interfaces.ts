export interface userTokens {
  access: string,
  refresh: string
}

export interface userLoginData {
    username: string,
    password: string
}

export interface userRegistrationData {
  username: string,
  email: string,
  password: string,
  password2: string,
  phone?: string,
  first_name?: string,
  last_name?: string
}

export interface decodedAccess {
   user_id: number, 
   name: string, 
   editor: boolean, 
   exp: number,
   admin: boolean
  }