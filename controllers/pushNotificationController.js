const https = require('https');

module.exports = {


    sendNotification(token, data) {

        const notification = JSON.stringify({
            'to': token,
            'data': {
                'click_action': 'FLUTTER_NOTIFICATION_CLICK',
                'title': data.title,
                'body': data.body,
                'id_notification': data.id_notification,
            },
            'notification': {
                'click_action': 'FLUTTER_NOTIFICATION_CLICK',
                'title': data.title,
                'body': data.body,
                'id_notification': data.id_notification,
            },
            'priority': 'high',
            'ttl': '4500s'
        });
        console.log('111111111111111111111111111111111111111111111111111111111111111');

        const options = {
            hostname: 'fcm.googleapis.com',
            path: '/fcm/send',
            method: 'POST',
            port: 443,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'key=AAAAm9lKN3Q:APA91bGE-dBbnK61-rDe7dqeRGEeC7NGpyitU3C48F6oo8kpY9BSwX7i51iSLIMoWsT44Fb56dOcwOEWXWPBmxA47tYrKZg11KqgnfaSBHEpQGnbpJ_YIoTbySGVFjOHq4mcsXp9TA4i',
            }
        }
          
        
        console.log('2222222222222222222222222222222222222222222222222222222222222222222');
        const req = https.request(options, (res) => {
            console.log('STATUS CODE FIREBASE', res.statusCode);

            console.log('333333333333333333333333333333333333333333333333333333333333333');
            res.on('data', (d) => {
                process.stdout.write(d);
            });
        });

        req.on('error', (error) => {
            console.log('ERROR DE FIREBASE MESSAGING', error);
        });

        req.write(notification);
        req.end();

    }

}