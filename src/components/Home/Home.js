import React from 'react';
import MusicTable from 'components/Table/MusicTable';
const Home = ({ data, onLoading, onAddPlaylist }) => {
    
    if ( !onLoading ) {
        return (
            <MusicTable data={data} onLoading={onLoading} onAddPlaylist={onAddPlaylist} title="실시간 차트" />
        )
    }else{
        return ( <div> </div> );
    }
}

export default Home;

