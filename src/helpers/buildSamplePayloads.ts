import { Id } from "@xyo-network/id-payload-plugin"
import { PayloadBuilder } from "@xyo-network/payload-builder"
import { HashPayload } from "@xyo-network/xl1-protocol"

export const buildSamplePayloads = async () => {
  // Data to store off-chain
  const offChainPayloads: Id[] = [0, 1].map(index => ({
    schema: 'network.xyo.id',
    salt: `Hello from Sample ${index} - ${new Date().toISOString()}`,
  }))

  // build a hash payload with the hash of the off-chain payload
  const hashPayloads: HashPayload[] = await Promise.all([0, 1].map(async index => ({
    schema: 'network.xyo.hash',
    hash: await PayloadBuilder.hash(offChainPayloads[index]),
  })))
  return { offChainPayloads, hashPayloads }
}