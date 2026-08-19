import { workflowDatabaseEventTriggerSchema } from '@/workflow/schemas/database-event-trigger-schema';
import { stepFilterSchema } from '@/workflow/schemas/step-filter-schema';

const STEP_FILTER = {
  id: '4bc96a2d-b06e-4ad0-8d43-bc4e20ccb541',
  type: 'SELECT',
  value: '["CUSTOMER"]',
  operand: 'IS',
  stepFilterGroupId: '2b9c46aa-4a67-4d0e-9b72-c0a16331f5be',
};

describe('stepFilterSchema', () => {
  it('should wrap a bare stepOutputKey in a variable template', () => {
    expect(
      stepFilterSchema.parse({
        ...STEP_FILTER,
        stepOutputKey: 'trigger.properties.after.lifecycleStage',
      }).stepOutputKey,
    ).toBe('{{trigger.properties.after.lifecycleStage}}');
  });

  it('should leave an already wrapped stepOutputKey untouched', () => {
    expect(
      stepFilterSchema.parse({
        ...STEP_FILTER,
        stepOutputKey: '{{trigger.properties.after.lifecycleStage}}',
      }).stepOutputKey,
    ).toBe('{{trigger.properties.after.lifecycleStage}}');
  });

  it('should normalize trigger filters written through the database event trigger schema', () => {
    const parsedTrigger = workflowDatabaseEventTriggerSchema.parse({
      name: 'Record is updated',
      type: 'DATABASE_EVENT',
      settings: {
        fields: ['lifecycleStage'],
        filter: {
          stepFilters: [
            {
              ...STEP_FILTER,
              stepOutputKey: 'trigger.properties.after.lifecycleStage',
            },
          ],
          stepFilterGroups: [
            {
              id: '2b9c46aa-4a67-4d0e-9b72-c0a16331f5be',
              logicalOperator: 'AND',
            },
          ],
        },
        eventName: 'person.updated',
        objectType: 'person',
        outputSchema: {},
      },
    });

    expect(parsedTrigger.settings.filter?.stepFilters[0].stepOutputKey).toBe(
      '{{trigger.properties.after.lifecycleStage}}',
    );
  });
});
