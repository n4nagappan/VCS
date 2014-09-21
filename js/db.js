// Debugging IndexedDB : http://www.aaron-powell.com/posts/2012-10-05-indexeddb-storage.html
// Resource tab in the chrome dev tools can be used for viewing records

var vcs = vcs || {};
vcs.indexedDB = {};
vcs.indexedDB.db = null;

vcs.indexedDB.open = function() {
    console.log("Opening db");
    var version = 1;
    var request = indexedDB.open("orders", version);

    request.onupgradeneeded = function(e) {
        var db = e.target.result;
        
        e.target.transaction.onerror = vcs.indexedDB.onerror;
        
        if(db.objectStoreNames.contains("orders")){
            db.deleteObjectStore("orders");
        }
        
        var store = db.createObjectStore("orders",{ autoIncrement: true });
    };
    request.onsuccess = function(e) {
        vcs.indexedDB.db = e.target.result;
    };

    request.onerror = vcs.indexedDB.onerror;
};

vcs.indexedDB.addOrder = function(order){
    console.log("Adding order");
    
    //Add timeStamp field
    order.timeStamp = new Date().getTime();
    
    var db = vcs.indexedDB.db;
    var trans = db.transaction(["orders"] , "readwrite");
    var store = trans.objectStore("orders");
    var request = store.put(order);
    
    trans.oncomplete = function(e){
        console.log("Added order to the db successfully");
        vcs.indexedDB.getAllOrders();
    };
    
    trans.onerror = function(e){
        console.log("Transaction error : "+e.value);
    };
}

vcs.indexedDB.getAllOrders = function(){
    console.log("Getting all orders");
    var db = vcs.indexedDB.db;
    var trans = db.transaction(["orders"] , "readwrite");
    var store = trans.objectStore("orders");
    
    var keyRange = IDBKeyRange.lowerBound(0);
    var cursoreRequest = store.openCursor(keyRange);
    
    cursoreRequest.onsuccess = function(e){
        var result = e.target.result;
        if(!!result == false)
            return;
        
        console.log(JSON.stringify(result.value));
        result.continue();
    }
    
    cursoreRequest.onerror = vcs.indexedDB.onerror;
};

vcs.indexedDB.onerror = function(e){
    console.log(e)
}