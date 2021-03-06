import { Box, Sans, Serif, Spacer } from "@artsy/palette"
import { FairBoothHeader_show } from "__generated__/FairBoothHeader_show.graphql"
import { InvertedButton } from "lib/Components/Buttons"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface Props {
  show: FairBoothHeader_show
  onSaveShowPressed: () => void
}

const formatCounts = ({ artists, artworks }) => {
  const artistLabel = artists === 1 ? "artist" : "artists"
  const worksLabel = artworks === 1 ? "work" : "works"
  return `${artworks} ${worksLabel} by ${artists} ${artistLabel}`
}

export const FairBoothHeader: React.SFC<Props> = ({
  show: {
    partner: { name: partnerName },
    fair: { name: fairName },
    counts,
  },
  onSaveShowPressed,
}) => {
  return (
    <Box pt={12} px={2}>
      <Serif size="8">{partnerName}</Serif>
      <Spacer m={0.3} />
      <Sans weight="medium" size="3t">
        {fairName} • Booth
      </Sans>
      <Spacer m={0.5} />
      <Serif size="3t">Galleries</Serif>
      <Spacer m={0.3} />
      <Sans size="3t" color="black60">
        {formatCounts(counts)}
      </Sans>
      <Spacer m={6} />
      <InvertedButton text="Follow gallery" onPress={() => onSaveShowPressed()} />
    </Box>
  )
}

export const FairBoothHeaderContainer = createFragmentContainer(
  FairBoothHeader,
  graphql`
    fragment FairBoothHeader_show on Show {
      fair {
        name
      }
      partner {
        ... on Partner {
          name
        }
        ... on ExternalPartner {
          name
        }
      }
      counts {
        artworks
        artists
      }
    }
  `
)
