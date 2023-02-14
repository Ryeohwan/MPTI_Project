class userModel {
    constructor(){
        this.connectionId = '';
        this.audioActive = true;
        this.videoActive = true;
        this.screenShareActive = false;
        this.nickname = '';
        this.streamManager = undefined;
        this.type = 'local';
        this.isAudioActive = () => this.audioActive;
        this.isVideoActive = () => this.videoActive
        this.isScreenShareActive = () => this.screenShareActive
        this.getConnectionId = () => this.connectionId
        this.getNickname = () => this.nickname
        this.getStreamManager = () => this.streamManager
        this.isLocal = () => this.type === 'local'
        this.isRemote = () => !this.isLocal();
        this.setAudioActive = (isAudioActive) => {
            this.audioActive = isAudioActive
    
        }
        this.setVideoActive = (isVideoActive) => {
            this.videoActive = isVideoActive
    
        }
        this.setScreenShareActive = (isScreenShareActive) => {
            this.screenShareActive = isScreenShareActive
    
        }
        this.setStreamManager = (streamManager) => {
            this.streamManager = streamManager
    
        }
        this.setConnectionId = (conecctionId) => {
            this.connectionId = conecctionId
    
        }
        this.setNickname = (nickname) => {
            this.nickname = nickname
    
        }
        this.setType = (type) => {
            if (type === 'local' | type === 'remote') {
                this.type = type
            }
    
        }
    }




}












export default userModel