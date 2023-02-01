import { OpenVidu } from 'openvidu-browser'

export default function ClientMyPt() {
    const OV = new OpenVidu();
    const state = {
        mySessionId: 'SessionA',
        myUserName: 'Participant',
        session: undefined,
        mainStreamManager: undefined, // Main video of the page. Will be the 'publisher' or one of the 'subscribers'
        publisher: undefined,
        subscribers: [],
    };
    state.session=OV.initSession()
    const mySession = state.session
    mySession.on('streamCreated', (event) => {
        let subscriber = mySession.subscribe(event.stream, undefined);
        let subscribers = state.subscribers;

        subscribers.push(subscriber);

        state.subscribers= subscribers;
    });

    mySession.on('streamDestroyed', (event) => {
        event.preventDefault();
        console.log(event)
    })

    mySession.on('exception', (exception) => {
        console.warn(exception)
    })

    return (
        <div>
            {state.subscribers.map((sub, i) => (
            <div key={i} className="stream-container col-md-6 col-xs-6">
                <div streamManager={sub} mainVideoStream={this.handleMainVideoStream} />
            </div>
            ))}
        </div>
    )
}