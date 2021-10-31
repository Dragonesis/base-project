import React from 'react'
import { Story, Meta } from '@storybook/react'
import { Button, ButtonProps } from './Button'

export default {
  title: 'UI/Button',
  component: Button,
  argTypes: {
    type: {
      options: ['button', 'submit'],
      control: { type: 'radio' }
    },
    handleClick: { action: 'Button pressed' }
  },
} as Meta

const Template: Story<ButtonProps> = (args) => <Button {...args} />

export const ButtonExample = Template.bind({})
ButtonExample.args = {
  children: 'Button ',
  type: 'button'
}