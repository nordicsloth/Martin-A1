var http = require('http');
var server = http.createServer(requestHandler); 
server.listen(process.env.PORT, process.env.IP, startHandler);

function startHandler()
{
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
}

function requestHandler(req, res) 
{
    var url = require('url');
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    
    res.writeHead(200, {'Content-Type': 'text/html'});
    
    //PART 1
    if (query['cmd'] == 'repeat')
    {
      console.log("Handling a request");
      console.log(query);
      var str = ' ';
     
     for(var i=0; i<query['word'].length; i++)
     {
       res.write('<pre>'+ query['word'] +'</pre>');
     }
    
      res.end('');
    }
    
    //PART 2
     if (query['cmd'] == 'dotted')
     {
      console.log("Handling a request");
      console.log(query);
      var first = query['word1'];
      var second = query['word2'];
      
      var both = first.length + second.length;
      var minus = 30 - both;
      
      res.write('<pre>'+ first);
      for(var j=30; j>both; j--)
      {
        res.write('.');
      }
      res.write(second +'</pre>');
     }
     
     //PART 3
     if (query['cmd'] == 'stats')
     {
      console.log("Handling a request");
      console.log(query);
      var min = 100;
      var max = 0;
      var total = 0;
      
      for(var i in query['grades'])
      {
        total = total + parseInt(query['grades'][i]);
        if(query['grades'][i]<min)
        {
          min = query['grades'][i];
        }
        if(query['grades'][i]>max)
        {
          max = query['grades'][i];
        }
      }
      var avg = total / query['grades'].length;
      
      res.write('<pre>' + 'Avg:' + avg + ' ' + 'Min:' + min + ' ' + 'Max:' + max + '</pre>');
     }
     
    else
    {
      res.end('');
    }
}