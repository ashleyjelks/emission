import { Box, Separator, Serif } from "@artsy/palette"
import { MoreInfo_show } from "__generated__/MoreInfo_show.graphql"
import React from "react"
import { FlatList, NavigatorIOS, ViewProperties } from "react-native"
import { createFragmentContainer, graphql } from "react-relay"

import styled from "styled-components/native"
import { EventSectionContainer as EventSection } from "../Components/EventSection"
import { TextSection } from "../Components/TextSection"

const ListHeaderText = styled(Serif)`
  height: 36px;
`

interface Props extends ViewProperties {
  navigator: NavigatorIOS
  show: MoreInfo_show
}

interface State {
  sections: Array<{
    type: "event" | "press-release"
    data: any
  }>
}

export class MoreInfo extends React.Component<Props, State> {
  state = {
    sections: [],
  }

  componentDidMount() {
    const { show } = this.props

    const sections = []

    show.events.forEach(event => {
      sections.push({
        type: "event",
        data: { event },
      })
    })

    if (show.press_release) {
      sections.push({
        type: "press-release",
        data: show,
      })
    }

    this.setState({ sections })
  }

  renderItemSeparator = () => (
    <Box py={3} px={2}>
      <Separator />
    </Box>
  )

  renderItem = ({ item: { data, type } }) => {
    switch (type) {
      case "event":
        return <EventSection {...data} />
      case "press-release":
        return <TextSection title="Press Release" text={data.press_release} />
    }
  }

  render() {
    return (
      <FlatList
        data={this.state.sections}
        ListHeaderComponent={
          <>
            <ListHeaderText size="8" mt={12} px={2}>
              About the show
            </ListHeaderText>
            {this.renderItemSeparator()}
          </>
        }
        ItemSeparatorComponent={this.renderItemSeparator}
        renderItem={item => <Box px={2}>{this.renderItem(item)}</Box>}
        keyExtractor={(item, index) => item.type + String(index)}
      />
    )
  }
}

export const MoreInfoContainer = createFragmentContainer(
  MoreInfo,
  graphql`
    fragment MoreInfo_show on Show {
      press_release
      events {
        ...EventSection_event
      }
    }
  `
)
