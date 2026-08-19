import { ViewFilterOperandDeprecated } from '@/types';
import { z } from 'zod';
import { ViewFilterOperand } from '../../types/ViewFilterOperand';
import { normalizeStepOutputKey } from '../utils/normalizeStepOutputKey';

export const stepFilterSchema = z.object({
  id: z.string(),
  type: z.string(),
  stepOutputKey: z
    .string()
    .describe(
      'Variable template for the value being filtered, wrapped in double curly braces, e.g. "{{trigger.properties.after.lifecycleStage}}". A bare path is not resolved at runtime and the filter would never match.',
    )
    .transform(normalizeStepOutputKey),
  operand: z.enum(ViewFilterOperand).or(z.enum(ViewFilterOperandDeprecated)),
  value: z.string(),
  stepFilterGroupId: z.string(),
  positionInStepFilterGroup: z.number().optional(),
  fieldMetadataId: z.string().optional(),
  compositeFieldSubFieldName: z.string().optional(),
});
