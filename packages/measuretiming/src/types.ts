/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import type { ACTION_TYPE, MARKER } from './constants';
import type { DependencyList, MutableRefObject } from 'react';
import type { ReportFn, Report } from './generateReport';
import type { ActionLog } from './actionLog';

export type ShouldResetOnDependencyChange = (
  oldDependencies: DependencyList,
  newDependencies: DependencyList
) => boolean;

export interface WithTimingId {
  /**
   * The identifier of this timing. Needs to be the same across all usages.
   * You may change it during the hook execution without restarting the measurement, however it's best to avoid that.
   * If you want an 'id' change to restart measurement, put it into hook's dependencies list.
   */
  id: string;
}

export interface WithOnInternalError<CustomMetadata extends Record<string, unknown>> {
  onInternalError?: (error: Error, report?: ReportWithInfo, metadata?: CustomMetadata) => void;
}

export interface WithBeaconConfig<Placements extends string = string> {
  /**
   * Where is this beacon placed?
   * This value must be unique between all the instances of the hook, so they co-operate correctly.
   */
  placement: Placements;
}

export interface WithActionLogRef<CustomMetadata extends Record<string, unknown>> {
  /**
   * An instance of ActionLog in a ref object (must be provided so it can be cached externally)
   */
  actionLogRef: MutableRefObject<ActionLog<CustomMetadata>>;
}

export interface WithShouldResetOnDependencyChangeFn {
  /**
   * An optional function that returns true if you want to restart measuring after dependencies have changed.
   * You may use this to prevent restarting in case you know a component re-renders with an invalid value.
   * Signature is: (oldDependencies, newDependencies): boolean
   **/
  shouldResetOnDependencyChangeFn?: ShouldResetOnDependencyChange;
}

export interface MeasurementBeaconState extends WithShouldResetOnDependencyChangeFn {
  /**
   * Time different rendering stages by changing the value of this property.
   * Use one of the DEFAULT_STAGES or any string value for custom stages.
   * Must be used in combination with `finalStages`, or left undefined to disable capturing stages.
   */
  stage?: string;

  /**
   * Setting this to anything other than undefined or null
   * will immediately set the stage to DEFAULT_STAGES.ERROR, and flush any report information
   */
  error?: Error | null;

  /**
   * Setting this to `false` will immediately disable capturing any data.
   * If flushUponDeactivation is `true` and data is present, it will immediately flush any report information.
   * The equivalent of setting `stage` to INFORMATIVE_STAGES.INACTIVE.
   */
  isActive?: boolean;
}

export interface StaticActionLogOptions<
  Placements extends string,
  CustomMetadata extends Record<string, unknown>
> extends WithReportFn<CustomMetadata>,
    WithOnInternalError<CustomMetadata> {
  /** the number of milliseconds we will wait before another render, or sending the report */
  debounceMs?: number;
  /** stop timing after this amount of milliseconds passes from the start of the render */
  timeoutMs?: number;
  /**
   * When one of these stages is reached and debounced time passes, we will send the report.
   * If an empty array (default), the report will be sent immediately after rendering settles.
   **/
  finalStages?: readonly string[];
  /**
   * When one of these stages is reached, we will IMMEDIATELY send the report and reset.
   * By default this is just the ERROR stage.
   **/
  immediateSendStages?: readonly string[];
  /**
   * Will only activate the timing hook after *all* the placements listed in the array were mounted
   * Specifying this can be useful if you have conditional logic that means only some hooks will get mounted (e.g. timing of opening a menu).
   **/
  waitForBeaconActivation?: readonly Placements[];

  /**
   * Require a certain number of simultaneously mounted placements to send the timing report.
   */
  expectedSimultaneouslyRenderableBeaconsCount?: number;

  /**
   * If true, will flush the report immediately upon deactivation, without waiting for browser to settle.
   * Default is `false`.
   */
  flushUponDeactivation?: boolean;
}

export interface WithReportFn<Metadata extends Record<string, unknown>> {
  reportFn?: ReportFn<Metadata>;
}

export interface WithMetadata<Metadata extends Record<string, unknown>> {
  metadata?: Metadata;
}

export interface ReportWithInfo extends Report {
  maximumActiveBeaconsCount: number;
  expectedSimultaneouslyRenderableBeaconsCount?: number;
}

export interface DynamicActionLogOptions<CustomMetadata extends Record<string, unknown>>
  extends WithTimingId,
    WithShouldResetOnDependencyChangeFn,
    WithReportFn<CustomMetadata>,
    WithOnInternalError<CustomMetadata> {}

export type ActionLogCache<CustomMetadata extends Record<string, unknown>> = Map<
  string,
  ActionLog<CustomMetadata>
>;

export interface WithActionLogCache<CustomMetadata extends Record<string, unknown>> {
  actionLogCache: ActionLogCache<CustomMetadata>;
}

export interface ActionLogExternalApi<
  CustomMetadata extends Record<string, unknown> = Record<string, unknown>
> {
  markRenderStart: (idSuffix: string) => void;
  markRenderEnd: (idSuffix: string) => void;
  dispose: (idSuffix: string) => void;
  getActionLogForId: (idSuffix: string) => ActionLog<CustomMetadata>;
  getActionLogForIdIfExists: (idSuffix: string) => ActionLog<CustomMetadata> | undefined;
  setActive: (idSuffix: string, active: boolean) => void;
  markStage: (idSuffix: string, stage: string, stageMetadata?: Record<string, unknown>) => void;
}

export interface UseActionLogRefOptions<
  CustomMetadata extends Record<string, unknown>,
  Placements extends string = string
> extends WithTimingId,
    StaticActionLogOptions<Placements, CustomMetadata>,
    WithActionLogCache<CustomMetadata> {
  garbageCollectMs: number;
}

export interface UseTimingMeasurementHookConfiguration<
  CustomMetadata extends Record<string, unknown>
> extends WithTimingId,
    WithBeaconConfig,
    WithOnInternalError<CustomMetadata>,
    WithActionLogRef<CustomMetadata>,
    WithReportFn<CustomMetadata>,
    MeasurementBeaconState {}

export interface UseTimingHookConfiguration<CustomMetadata extends Record<string, unknown>>
  extends WithBeaconConfig,
    WithOnInternalError<CustomMetadata>,
    WithReportFn<CustomMetadata>,
    WithMetadata<CustomMetadata>,
    MeasurementBeaconState,
    UseActionLogRefOptions<CustomMetadata> {}

export interface WithIdSuffix {
  idSuffix?: string;
}

export interface UseTimingBeaconHookOptions<CustomMetadata extends Record<string, unknown>>
  extends MeasurementBeaconState,
    WithBeaconConfig,
    WithOnInternalError<CustomMetadata>,
    WithMetadata<CustomMetadata>,
    WithIdSuffix {}

export interface GeneratedUseTimingBeaconHookConfiguration<
  CustomMetadata extends Record<string, unknown>
> extends Omit<UseTimingBeaconHookOptions<CustomMetadata>, 'placement' | 'type'>,
    WithMetadata<CustomMetadata>,
    WithReportFn<CustomMetadata> {}

export type GeneratedUseTimingBeaconHook = <CustomMetadata extends Record<string, unknown>>(
  options?: GeneratedUseTimingBeaconHookConfiguration<CustomMetadata>,
  restartWhenChanged?: DependencyList
) => void;

export interface GenerateUseTimingHooksConfiguration<
  Name extends string,
  Placements extends string,
  CustomMetadata extends Record<string, unknown>
> extends Partial<UseActionLogRefOptions<CustomMetadata, Placements>>,
    WithIdPrefix {
  name: Name;
}

export interface WithIdPrefix {
  idPrefix: string;
}

export interface GetPrefixedUseTimingHooksConfiguration<
  Placements extends string,
  Metadata extends Record<string, unknown>
> extends Omit<UseActionLogRefOptions<Metadata, Placements>, 'id'>,
    WithIdPrefix,
    WithBeaconConfig<Placements> {}

export type GeneratedTimingHooks<
  Name extends string,
  Placements extends readonly string[],
  GeneratedUseTimingBeacon = GeneratedUseTimingBeaconHook
> = {
  [K in `use${Name}TimingIn${Placements[number]}`]: GeneratedUseTimingBeacon;
} & {
  [K in `imperative${Placements[number]}TimingApi`]: ActionLogExternalApi;
};

export type ActionType = typeof ACTION_TYPE[keyof typeof ACTION_TYPE];
export type Marker = typeof MARKER[keyof typeof MARKER];
export type SpanMarker = typeof MARKER['START' | 'END'];
export type PointMarker = typeof MARKER['POINT'];

export interface BaseAction<NameT extends ActionType, MarkerT extends Marker> {
  timestamp: number;
  entry: PerformanceEntry & { startMark?: PerformanceEntry; endMark?: PerformanceEntry };
  type: NameT;
  marker: MarkerT;
  source: string;
  metadata?: Record<string, unknown>;
}

export type RenderActionType = typeof ACTION_TYPE['RENDER'];
export type RenderAction = BaseAction<RenderActionType, SpanMarker>;
export type UnresponsiveActionType = typeof ACTION_TYPE['UNRESPONSIVE'];
export type UnresponsiveAction = BaseAction<UnresponsiveActionType, SpanMarker>;
export type SpanAction = RenderAction | UnresponsiveAction;
export type StageChangeActionType = typeof ACTION_TYPE['STAGE_CHANGE'];

export interface StageChangeAction extends BaseAction<StageChangeActionType, PointMarker> {
  stage: string;
}

export type DependencyChangeActionType = typeof ACTION_TYPE['DEPENDENCY_CHANGE'];
export type DependencyChangeAction = BaseAction<DependencyChangeActionType, PointMarker>;
export type Action = SpanAction | StageChangeAction | DependencyChangeAction;
interface StateMeta {
  mountedPlacements: readonly string[];
  timingId: string;
}
export type ActionWithStateMetadata = Action & StateMeta;
export interface StageDescription extends StateMeta {
  previousStage: string;
  stage: string;
  timeToStage: number;
  metadata?: Record<string, unknown>;
}
