import React from 'react'
import {Meta} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import {get} from '../constants'
import {BaseStyles, ThemeProvider} from '..'
import Box from '../Box'
import AvatarToken, {AvatarTokenProps} from '../Token/AvatarToken'
import Text from '../Text'

export default {
  title: 'Tokens/AvatarToken',
  component: AvatarToken,
  argTypes: {
    text: {
      defaultValue: 'Mike Perrotti'
    },
    avatarSrc: {
      defaultValue: 'https://avatars.githubusercontent.com/mperrotti'
    }
  },
  decorators: [
    Story => {
      return (
        <ThemeProvider>
          <BaseStyles>
            <Story />
          </BaseStyles>
        </ThemeProvider>
      )
    }
  ]
} as Meta

const excludedControlKeys = ['id', 'as', 'tabIndex', 'onRemove']

const SingleExampleContainer: React.FC<{label?: string}> = ({children, label}) => (
  <Box
    display="flex"
    sx={{
      alignItems: 'start',
      flexDirection: 'column',
      gap: get('space.0')
    }}
  >
    {label ? (
      <Text fontSize={0} color="fg.muted">
        {label}
      </Text>
    ) : null}
    {children}
  </Box>
)

const ExampleCollectionContainer: React.FC = ({children}) => (
  <Box
    display="flex"
    sx={{
      alignItems: 'start',
      flexDirection: 'column',
      gap: get('space.6')
    }}
  >
    <Text fontSize={1} color="fg.subtle">
      Hint: use the &quot;Controls&quot; tab in the Addons panel to change the token properties
    </Text>
    {children}
  </Box>
)

export const DefaultToken = (args: Omit<AvatarTokenProps, 'ref'>) => {
  return (
    <ExampleCollectionContainer>
      <AvatarToken {...args} />
    </ExampleCollectionContainer>
  )
}
DefaultToken.storyName = 'Default'
DefaultToken.parameters = {controls: {exclude: [...excludedControlKeys, 'hideRemoveButton']}}

export const Interactive = (args: Omit<AvatarTokenProps, 'ref' | 'text'>) => {
  return (
    <ExampleCollectionContainer>
      <Box
        display="flex"
        sx={{
          alignItems: 'start',
          gap: get('space.2')
        }}
      >
        <AvatarToken as="a" href="http://google.com/" text="Link" {...args} />
        <AvatarToken as="button" onClick={action('clicked')} text="Button" {...args} />
        <AvatarToken as="span" tabIndex={0} onFocus={action('focused')} text="Focusable Span" {...args} />
      </Box>
    </ExampleCollectionContainer>
  )
}
Interactive.parameters = {controls: {exclude: [...excludedControlKeys, 'hideRemoveButton', 'text']}}

export const WithOnRemoveFn = (args: Omit<AvatarTokenProps, 'ref'>) => {
  return (
    <ExampleCollectionContainer>
      <SingleExampleContainer label="w/ onRemove passed">
        <AvatarToken onRemove={action('remove me')} {...args} />
      </SingleExampleContainer>
      <SingleExampleContainer label="w/ onRemove passed and the token is interactive">
        <Box
          display="flex"
          sx={{
            alignItems: 'start',
            gap: get('space.2')
          }}
        >
          <AvatarToken as="a" href="http://google.com/" onRemove={action('remove me')} {...args} text="Link" />
          <AvatarToken as="button" onClick={action('clicked')} onRemove={action('remove me')} {...args} text="Button" />
          <AvatarToken
            as="span"
            tabIndex={0}
            onFocus={action('focused')}
            onRemove={action('remove me')}
            {...args}
            text="Focusable Span"
          />
        </Box>
      </SingleExampleContainer>
    </ExampleCollectionContainer>
  )
}
WithOnRemoveFn.parameters = {controls: {exclude: excludedControlKeys}}
