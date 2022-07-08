const InitialOBJ = {
    loggedin: false,
    name: "",
    photourl: "",
    email: "",
    socialaccount: "",
};

let InitialState;
if(localStorage.getItem("cupidify") === null){
    InitialState = InitialOBJ;
}
else{
    InitialState = JSON.parse(localStorage.getItem("cupidify"))
}

// console.log(InitialState)

const rootReducer = (state = InitialState, action) => {
    switch(action.type){
        case 'SIGNIN':
            let newstate = state;
            newstate.loggedin = true;
            newstate.name = action.payload.name;
            newstate.photourl = action.payload.photourl;
            newstate.email = action.payload.email;
            newstate.socialaccount = action.payload.socialaccount;
            state = newstate;
            localStorage.setItem("cupidify", JSON.stringify(state));  
            return state;
        case 'LOGOUT':
            state.loggedin = false;
            state.name = "";
            state.photourl = "";
            state.email = "";
            state.socialaccount = "";
            localStorage.setItem("cupidify", JSON.stringify(state));
            return state;
        default: return state;
    }
}

export default rootReducer