import React from 'react';
import Parse from 'parse';



export default () => {

    React.useEffect( () => {

        // Parse configuration
        Parse.initialize("myAppID", null, "myMasterKey");
        Parse.serverURL = "http://localhost:2000/parse";
        Parse.liveQueryServerURL = "ws://localhost:2000/parse";

        const query = new Parse.Query('Door');


        query.subscribe()
            .then( subscription => {
                subscription.on('open', () => {
                    console.log('open')
                })
                subscription.on('close', {

                })
            })
            .catch( err => console.log(err.message))


    }, [])

    return (
        <div>
            hello
        </div>
    )
}

