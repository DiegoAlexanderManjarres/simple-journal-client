export const ISLOGGED_IN__QUERY = {
    query: ` 
        query {
            isLoggedIn
        }
    `
}

export const GET_MY_ENTRIES__QUERY = {
    query: ` 
        query EntriesInput(
            $skip: Int,
            $first: Int,
            $last: Int,
            $after: String,
            $before: String,
            $entryId: String
            ) {
            entries(
                skip: $skip,
                first: $first,
                last: $last,
                after: $after,
                before: $before,
                entryId: $entryId,
            ) { 
                id 
                title 
                text 
                createdAt
            }
        }        
    `
}


