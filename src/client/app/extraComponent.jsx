class Grab {
	constructor(opts){
		return new Promise(function(resolve,reject){
			if(opts.url){
				let xhrObj = new XMLHttpRequest(),method;
				if(!opts.method){
					method = 'GET';
					opts.data = null;
				}
				xhrObj.open(method,opts.url);
				xhrObj.onload = function(){
					resolve(xhrObj.response);
				};
				xhrObj.onerror = function(){
					reject({
						status: this.status,
						statusText: xhrObj.statusText
					});
				};
				xhrObj.send(opts.data);
			}
		});
	}
}

export default Grab;
