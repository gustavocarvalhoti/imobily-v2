import {BrowserRouter, Route, Switch} from "react-router-dom";
import React from "react";
import Landing from "./pages/Landing";
import OrphanagesMap from "./pages/OrphanagesMap";
import CreateOrphanage from "./pages/CreateOrphanage";
import CreateRealState from "./pages/CreateRealState";
import CreateProperty from "./pages/CreateProperty";
import Orphanage from "./pages/Orphanage";

function Routes() {
    return (
        <BrowserRouter>
            <Switch> {/*Force one route per page*/}
                <Route path="/" component={Landing} exact/>
                <Route path="/app" component={OrphanagesMap}/>
                <Route path="/orphanages/create" component={CreateOrphanage}/>
                <Route path="/orphanages/:id" component={Orphanage}/>
                <Route path="/real-state/create" component={CreateRealState}/>
                <Route path="/property/create" component={CreateProperty}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;