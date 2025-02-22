import { h, defineComponent, computed, CSSProperties, Fragment } from 'vue'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import type { ExtractPublicPropTypes } from '../../_utils'
import type { ThemeProps } from '../../_mixins'
import { thingLight } from '../styles'
import type { ThingTheme } from '../styles'
import style from './styles/index.cssr'

export const thingProps = {
  ...(useTheme.props as ThemeProps<ThingTheme>),
  title: String,
  titleExtra: String,
  description: String,
  content: String,
  contentIndented: {
    type: Boolean,
    default: false
  }
}

export type ThingProps = ExtractPublicPropTypes<typeof thingProps>

export default defineComponent({
  name: 'Thing',
  props: thingProps,
  setup (props, { slots }) {
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
    const themeRef = useTheme(
      'Thing',
      '-thing',
      style,
      thingLight,
      props,
      mergedClsPrefixRef
    )
    const cssVarsRef = computed(() => {
      const {
        self: { titleTextColor, textColor, titleFontWeight, fontSize },
        common: { cubicBezierEaseInOut }
      } = themeRef.value
      return {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-font-size': fontSize,
        '--n-text-color': textColor,
        '--n-title-font-weight': titleFontWeight,
        '--n-title-text-color': titleTextColor
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('thing', undefined, cssVarsRef, props)
      : undefined

    return () => {
      const { value: mergedClsPrefix } = mergedClsPrefixRef
      themeClassHandle?.onRender?.()
      return (
        <div
          class={[`${mergedClsPrefix}-thing`, themeClassHandle?.themeClass]}
          style={
            inlineThemeDisabled
              ? undefined
              : (cssVarsRef.value as CSSProperties)
          }
        >
          {slots.avatar && props.contentIndented ? (
            <div class={`${mergedClsPrefix}-thing-avatar`}>
              {slots.avatar()}
            </div>
          ) : null}
          <div class={`${mergedClsPrefix}-thing-main`}>
            {!props.contentIndented &&
            (slots.header ||
              props.title ||
              slots['header-extra'] ||
              props.titleExtra ||
              slots.avatar) ? (
              <div class={`${mergedClsPrefix}-thing-avatar-header-wrapper`}>
                {slots.avatar ? (
                  <div class={`${mergedClsPrefix}-thing-avatar`}>
                    {slots.avatar()}
                  </div>
                ) : null}
                {slots.header ||
                props.title ||
                slots['header-extra'] ||
                props.titleExtra ? (
                  <div class={`${mergedClsPrefix}-thing-header-wrapper`}>
                    <div class={`${mergedClsPrefix}-thing-header`}>
                      {slots.header || props.title ? (
                        <div class={`${mergedClsPrefix}-thing-header__title`}>
                          {slots.header ? slots.header() : props.title}
                        </div>
                      ) : null}
                      {slots['header-extra'] || props.titleExtra ? (
                        <div class={`${mergedClsPrefix}-thing-header__extra`}>
                          {slots['header-extra']
                            ? slots['header-extra']()
                            : props.titleExtra}
                        </div>
                      ) : null}
                    </div>
                    {slots.description || props.description ? (
                      <div class={`${mergedClsPrefix}-thing-main__description`}>
                        {slots.description
                          ? slots.description()
                          : props.description}
                      </div>
                    ) : null}
                  </div>
                    ) : null}
              </div>
                ) : (
              <>
                {slots.header ||
                props.title ||
                slots['header-extra'] ||
                props.titleExtra ? (
                  <div class={`${mergedClsPrefix}-thing-header`}>
                    {slots.header || props.title ? (
                      <div class={`${mergedClsPrefix}-thing-header__title`}>
                        {slots.header ? slots.header() : props.title}
                      </div>
                    ) : null}
                    {slots['header-extra'] || props.titleExtra ? (
                      <div class={`${mergedClsPrefix}-thing-header__extra`}>
                        {slots['header-extra']
                          ? slots['header-extra']()
                          : props.titleExtra}
                      </div>
                    ) : null}
                  </div>
                    ) : null}
                {slots.description || props.description ? (
                  <div class={`${mergedClsPrefix}-thing-main__description`}>
                    {slots.description
                      ? slots.description()
                      : props.description}
                  </div>
                ) : null}
              </>
                )}
            {slots.default || props.content ? (
              <div class={`${mergedClsPrefix}-thing-main__content`}>
                {slots.default ? slots.default() : props.content}
              </div>
            ) : null}
            {slots.footer ? (
              <div class={`${mergedClsPrefix}-thing-main__footer`}>
                {slots.footer()}
              </div>
            ) : null}
            {slots.action ? (
              <div class={`${mergedClsPrefix}-thing-main__action`}>
                {slots.action()}
              </div>
            ) : null}
          </div>
        </div>
      )
    }
  }
})
