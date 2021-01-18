const intialState={
    
    userInfo:[]
    
}
const UserReducer=(state=intialState,action)=>{

  console.log("TYPE==="+action.type)
    switch(action.type){
   
        
         case 'USER_INFO':
           return {
            ...state,
            userInfo: state.userInfo.concat(action.payload)
            
          }
        
          default:
              return state;      
    }
    


}

export default UserReducer;