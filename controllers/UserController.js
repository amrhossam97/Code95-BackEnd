const Users = require('../models/userModel');

module.exports = function (app) {
   
    // get all Users
    app.get('/api/users', function (req, res ,next) {

        Users.find({})
        .then(Users => res.status(200).send(Users))
        .catch(next)
    });
    // get by Query
    app.post('/api/users/query', function (req, res ,next) {
        let lastQuery = {};
        let queries = [];
        for(let q of req.body){
            let query = {};
            switch (q.operator) {
                case '=':{
                    query[q.key] = q.data
                  break;
                }
                case '!=':{
                    query[q.key] = { '$ne' :q.data}
                  break;
                }  
                 case '<':{
                    query[q.key] = { '$lt' :q.data}
                  break;
                }
                case '>':{
                    query[q.key] = { '$gt' :q.data}
                  break;
                }
                case 'starts with':{
                    query[q.key] = new RegExp('^' + q.data)
                  break;
                }
                case 'ends with':{
                    query[q.key] = new RegExp( q.data +'$' )
                  break;
                }
                case 'contains':{
                    query[q.key] = new RegExp( q.data ,'i' )
                  break;
                }
                case 'exact':{
                  query[q.key] = new RegExp( '^' + q.data +'$' )
                  break;
                }
                
                default:{
                    console.log('Please Enter Operation');
                    return;
                  } 
            }
            if(q.index === 0)
            {
                queries.push({
                    query,
                    index : 1,
                    logicOpe : q.logicOpe
                });
            }
            else
            {
                queries.push({
                    query,
                    index : q.index,
                    logicOpe : q.logicOpe
                });
            }
            
        }

        let temp ={};
        let tempKey ='';
        let container ={};
        if(queries.length != 1){
            for(let que of queries)
            {
                container = {};
                let key = Object.keys(que.query)[0];
                if(que.logicOpe === 'and' )
                {
                    container['$and'] = [
                        {[key] : que.query[key]},
                        {[tempKey] : temp[tempKey]}
                    ]
                }
                else if(que.logicOpe === 'or'){
                    container['$or'] = [
                        {[key] : que.query[key]},
                        {[tempKey] : temp[tempKey]}
                    ]
                }
                else{
                     temp = que.query;
                     tempKey = Object.keys(temp)[0];
                     continue;
                }
                temp = container ; 
                tempKey = Object.keys(temp)[0];
            }
        }
        else
        {
            container = queries[0].query
        }
        
        console.log(container);
        Users.find(container)
        .then(Users => res.status(200).send(Users))
        .catch(next)
    });

}
