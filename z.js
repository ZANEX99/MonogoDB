	conn = new Mongo();// connt monogodb
	db = conn.getDB("db");  //select datebase
	db.auth("zane","123");  //admin verify
	seperate_line="*****************************************************************"
//question 1

	print(seperate_line);
	print('Q1: How many unique user are there');
	var alluser = db.tt.distinct("id_member").length;
	print('Total user:'+alluser+'in this database');

//question 2

	print(seperate_line);

   print('');
   print('Q2: How many tweets(%) did the top 10 users measured by the number of messages publish');
   var total_msg = db.tt.find().count();
   var top_10 = db.tt.aggregate([{$group:{_id:"$id_member",num_tweets:{$sum:1}}},{$sort:{num_tweets:-1}},{$limit:10}])
// a =top_10.toString();
// var top_10clean= a.string.REPLACE('-','');
   print("Top10 users information:" + JSON.stringify(top_10));
// var t10_tweets=0, i=0;
// t =t_10[i];
// for (i=0;i<10;i++) {
// 		t10_tweets =t10_tweets + top['num_tweets'];
// 		var percent = Math.round(t10_tweets/total_msg*10000)/100.00 +"%";
// 	
// }   
   if(top_10.length){
      var top10_tweets = 0, i = 0;
      var t = top_10[i];
      while (i<10)
      {
      	top10_tweets = top10_tweets + t['num_tweets'];
      	i++;
      }
      var percent = Math.round(t10_tweets/total_msg*10000)/100.00 +"%";
     }

      print('The top 10 users tweets proportion: ' + percent);
      
//question3

	print(seperate_line);
	print('');
	print('Q3:What was the earliest and lastet data (YYYY-MM-DD HH:MM:SS) that a message was published?');
	var earliest_date = db.tt.find({},{"timestamp":1,"_id":0}).sort({timestamp: 1}).limit(1);	
	if (earliest_date.length()) {
		time1 = earliest_date[0];
		print( 'Earliestdate: '+ time1['timestamp']);
	}
	var latest_date = db.tt.find({},{"timestamp":1,"_id":0}).sort({timestamp: -1}).limit(1);
	if (latest_date.length()){
	   time2 = latest_date[0];
	   print('Latestdate: '+ time2['timestamp']);
	
	}
	
//question4

	print(seperate_line);
	print('Q4: What is the mean time delta between all message?');
	var total_msg = db.tt.find().count();
	var y1 =new Date('2014/06/22 23:00:00');
	var y2 =new Date('2014/06/30 21:59:59');
	var time=(y2.getTime()-y1.getTime())/1000; 
	
	var mean_msg= time/total_msg;
	print('The time interval(s):'+time);
	print('The mean time delta(s)' + mean_msg);

//question5

	print(seperate_line);
	print('');
	print('Query5: What is the mean length of a message?');
	var s = 0;
	var len=null;
	var total_msg = db.tt.find().count();
	db.tt.find({},{"text":1 , "_id":0}).forEach(function(q5){
		len +=  q5.text;
		result= Math.ceil(len.length/total_msg);
	})
	print("the mean length of a massage:" + result+" (integral)");
	
//question6

	print(seperate_line);

//question7

	print(seperate_line);
	print('');
	print('Q7:What is the average number of hashtags (#) used within a message?');
	var s = 0;
	var len='';
	var total_msg = db.tt.find().count();
	db.tt.find({},{"text":0 , "_id":0}).forEach(function(q7){
		len +=  q7.text;		
		
	})
	result7 = len.split("#").length-1;

	print("the mean length of a massage:" +"aaa"+result7);

//question8

	print(seperate_line);
	print('');
	print('Q8:Which area within the UK contains the largest number of published messages?Hint, the geographic latitude and longitude coordinates can be aggregated.')
