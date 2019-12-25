export const LOGIN_MUTATION = {
    query: ` 
        mutation LoginInput($data: LoginInput!) {
            login(data: $data) {
                user { id name }
            }
        }
    `
}


export const LOGOUT_QUERY = {
    query: `
        mutation {
            logout
        }
    `
}


export const REGISTER_MUTATION = {
    query:`
        mutation RegisterUser($data: UserCreateInput!) {
            createUser(data: $data) { 
                user { id name } 
            }
        } 
    `
}


export const ADD_ENTRY_MUTATION = {
    query:`
        mutation AddEntry($data: EntryCreateInput!) {
            addEntry(data: $data) { 
                id 
                title
                text
                createdAt
            }
        } 
    `
}


export const EDIT_ENTRY_MUTATION = {
    query:`
        mutation EditEntry($data: EntryEditInput!, $entryId: ID!) {
            editEntry(data: $data, entryId: $entryId) { 
                id 
                title
                text
                createdAt
            }
        } 
    `
}


export const DELETE_ENTRY_MUTATION = {
    query:`
        mutation DeleteEntry($entryId: ID!) {
            deleteEntry(entryId: $entryId) 
        } 
    `
}