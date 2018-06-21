import React from 'react';
import videoServices from '../../services/videoServices';
import VideoPlayer from './VideoPlayer';
import SearchBar from './SearchBar';
import Loading from '../../partials/loading/Loading';
import ListOfSuggestedVideos from './ListOfSuggestedVideos';


class FeedPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            videoId: 'N1_SXZs_sXo',
            videoUrl: "",
            searchInput: "",
            loading: true,
            suggestedVideos: []
        }
        this.collectValue = this.collectValue.bind(this);
    }

    collectValue(searchInput) {
        this.loadVideo(searchInput);
    }

    loadVideo(keyword) {
        this.setState({
            loading: true
        }, () => {
            videoServices.getVideo(keyword)
                .then(videoId => {
                    this.setState({
                        videoId,
                        videoUrl: 'https://www.youtube.com/embed/' + videoId,
                        loading: false
                    })

                    this.loadSuggestedVideos(videoId)
                }
                );
        })

    }

    loadSuggestedVideos(videoId) {
        videoServices.getSuggestedVideos(videoId)
            .then(videos => {
                console.log(videos);
                this.setState({
                    suggestedVideos: videos
                })
            })
    }

    componentDidMount() {
        this.loadVideo(this.state.searchInput);
    }

    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <SearchBar collectValue={this.collectValue} />
                </div>
                <div className='row'>
                    <div className='col-6 offset-1 videoPlayer'>
                        {(this.state.loading) ? <Loading /> : <VideoPlayer videoUrl={this.state.videoUrl} />}
                    </div>
                    <div className='col-4 offset-1'>
                        <ListOfSuggestedVideos videos={this.state.suggestedVideos} />
                    </div>
                </div>
            </div>
        )
    }
}

export default FeedPage;