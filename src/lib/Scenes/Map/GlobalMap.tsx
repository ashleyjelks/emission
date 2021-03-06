import { Flex } from "@artsy/palette"
import Mapbox from "@mapbox/react-native-mapbox-gl"
import { LocationMap_location } from "__generated__/LocationMap_location.graphql"
import React from "react"
import { NativeModules } from "react-native"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components/native"
import { FiltersBar } from "./Components/FiltersBar"
const Emission = NativeModules.Emission || {}

Mapbox.setAccessToken(Emission.mapBoxAPIClientKey)

const Map = styled(Mapbox.MapView)`
  height: 100%;
`

export enum PartnerType {
  gallery = "Gallery",
  museum = "Museum",
  fair = "Fair",
}

interface Props {
  location: LocationMap_location
  partnerType: PartnerType
  partnerName?: string
}

export class GlobalMap extends React.Component<Props> {
  render() {
    const { lat, lng } = { lat: 40.770424, lng: -73.981233 }

    return (
      <Flex mb={0.5}>
        <FiltersBar tabs={["All", "Saved", "Fairs", "Galleries", "Museums"]} />
        <Map
          key={lng}
          styleURL={Mapbox.StyleURL.Light}
          centerCoordinate={[lng, lat]}
          zoomLevel={14}
          logoEnabled={false}
          attributionEnabled={false}
        />
      </Flex>
    )
  }
}

export const GlobalMapContainer = createFragmentContainer(
  GlobalMap,
  graphql`
    fragment GlobalMap_viewer on Viewer
      @argumentDefinitions(near: { type: "Near", defaultValue: { lat: 22.3964, lng: 114.1095 } }) {
      shows: partner_shows(near: $near) {
        id
        name
      }
    }
  `
)
