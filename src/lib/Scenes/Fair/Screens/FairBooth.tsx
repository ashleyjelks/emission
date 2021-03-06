import { Box } from "@artsy/palette"
import { FairBooth_show } from "__generated__/FairBooth_show.graphql"
import React from "react"
import { FlatList } from "react-native"
import { createFragmentContainer, graphql } from "react-relay"

import { ShowArtistsPreviewContainer as ShowArtistsPreview } from "lib/Components/Show/ShowArtistsPreview"
import { ShowArtworksPreviewContainer as ShowArtworksPreview } from "lib/Components/Show/ShowArtworksPreview"
import { FairBoothHeaderContainer as FairBoothHeader } from "../Components/FairBoothHeader"

interface State {
  sections: Array<{ type: "artworks" | "artists"; data: object }>
}

interface Props {
  show: FairBooth_show
  onViewFairBoothArtworksPressed: (props: { show: FairBooth_show }) => void
  onViewFairBoothArtistsPressed: (props: { show: FairBooth_show }) => void
}

export class FairBooth extends React.Component<Props, State> {
  state = {
    sections: [],
  }

  componentDidMount() {
    const { show, onViewFairBoothArtworksPressed, onViewFairBoothArtistsPressed } = this.props
    const sections = []

    sections.push({
      type: "artworks",
      data: {
        show,
        onViewAllArtworksPressed: () => onViewFairBoothArtworksPressed({ show }),
      },
    })

    sections.push({
      type: "artists",
      data: {
        show,
        onViewAllArtistsPressed: () => onViewFairBoothArtistsPressed({ show }),
      },
    })
    this.setState({ sections })
  }

  renderItem = ({ item: { data, type } }) => {
    switch (type) {
      case "artworks":
        return <ShowArtworksPreview {...data} />
      case "artists":
        return <ShowArtistsPreview {...data} />
      default:
        return null
    }
  }

  handleSaveShow = () => {
    /** TODO: implement */
  }

  render() {
    const { sections } = this.state
    const { show } = this.props
    return (
      <FlatList
        data={sections}
        ListHeaderComponent={<FairBoothHeader show={show} onSaveShowPressed={this.handleSaveShow} />}
        renderItem={item => (
          <Box px={2} py={2}>
            {this.renderItem(item)}
          </Box>
        )}
        keyExtractor={(item, index) => item.type + String(index)}
      />
    )
  }
}

export const FairBoothContainer = createFragmentContainer(
  FairBooth,
  graphql`
    fragment FairBooth_show on Show {
      ...FairBoothHeader_show
      ...ShowArtworksPreview_show
      ...ShowArtistsPreview_show
      ...ShowArtists_show
      ...ShowArtworks_show
    }
  `
)
