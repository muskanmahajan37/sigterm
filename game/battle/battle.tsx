import * as React from 'react'
import { useState } from 'react'
import { Card } from '../../src/cards/card'
import { Creature } from '../../src/creatures/creature'

interface SelectingNone {
  type: 'none'
}

interface SelectingCard {
  type: 'card'
  filter(card: Card): boolean
  resolve(): void
}

interface SelectingCreature {
  type: 'creature'
  filter(creature: Creature): boolean
  resolve(): void
}

type Selecting = SelectingNone | SelectingCard | SelectingCreature

export function Battle() {
  const [selecting, setSelecting] = useState({ type: 'none' } as Selecting)

  return (
    <Col shim>
      <Row style={{ flex: 3 }}>
        <Shim />
        {[...game.allies, game.player].map(c => (
          <div
            onClick={click => dispatch(submitTarget(c.id))}
            onMouseEnter={event => dispatch(setFocus(c))}
            onMouseLeave={event => dispatch(unsetFocus(c))}
          >
            <Creature creature={c} game />
          </div>
        ))}
        <Shim />
        {[...game.enemies].map(c => (
          <div
            onClick={click => dispatch(submitTarget(c.id))}
            onMouseEnter={event => dispatch(setFocus(c))}
            onMouseLeave={event => dispatch(unsetFocus(c))}
          >
            <Creature creature={c} game />
          </div>
        ))}
        <Shim />
      </Row>

      <Row shim>
        <Col shim style={{ textAlign: 'center' }}>
          <div>Energy: {game.player.energy}</div>
          <div>Draw Pile: {game.drawPile.size}</div>
          <div>
            Hand Size: {game.hand.size}
            /10
          </div>
        </Col>
        <div style={{ flex: 3 }} />
        <Col shim style={{ textAlign: 'center' }}>
          <div>Exhausted: {game.exhaustPile.size}</div>
          <div>Discard Pile: {game.discardPile.size}</div>
          <Button onClick={() => tryEndTurn(game)} style={sty.button}>
            End Turn
          </Button>
        </Col>
      </Row>

      <Row style={{ height: 0 }}>
        <Shim />
        <Hand />
        <Shim />
      </Row>
    </Col>
  )
}

const sty = {
  button: {
    width: '320px',
    height: '67px',
    fontSize: '2rem',
    backgroundColor: '#444444',
  },
}
