let watcher;
// Watch for changes in gameStatus
watcher = {
    aInternal: "readyToStart",
    aListener: function(val) {},
    set gameStatus(val) {
        this.aInternal = val;
        this.aListener(val);
    },
    get gameStatus() {
        return this.aInternal;
    },
    registerListener: function(listener) {
        this.aListener = listener;
    }
}