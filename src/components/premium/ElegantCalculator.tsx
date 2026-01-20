import { useState } from 'react';
import { GlassCard } from './GlassCard';
import { PremiumInput } from './PremiumInput';
import { PremiumButton } from './PremiumButton';
import { SmoothReveal } from './SmoothReveal';

interface CalculatorStep {
  id: string;
  label: string;
  description?: string;
  type: 'number' | 'select' | 'text';
  options?: string[];
  unit?: string;
}

interface ElegantCalculatorProps {
  title: string;
  subtitle?: string;
  steps: CalculatorStep[];
  onCalculate: (values: Record<string, string>) => string | number;
  resultLabel?: string;
}

/**
 * ElegantCalculator - Premium interactive component
 * Feels like a guided ritual, not a technical tool
 * Perfect for restaurant reservations, pricing, or esoteric calculations
 */
export function ElegantCalculator({
  title,
  subtitle,
  steps,
  onCalculate,
  resultLabel = 'Result',
}: ElegantCalculatorProps) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [result, setResult] = useState<string | number | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const handleValueChange = (id: string, value: string) => {
    setValues(prev => ({ ...prev, [id]: value }));
  };

  const handleCalculate = () => {
    const calculatedResult = onCalculate(values);
    setResult(calculatedResult);
  };

  const isStepComplete = (stepId: string) => {
    return values[stepId] && values[stepId].length > 0;
  };

  const allStepsComplete = steps.every(step => isStepComplete(step.id));

  return (
    <div className="relative">
      {/* Decorative background glow */}
      <div 
        className="absolute inset-0 -z-10 opacity-30 blur-3xl"
        style={{
          background: 'radial-gradient(circle at 50% 50%, var(--primary-soft) 0%, transparent 70%)',
        }}
      />

      <SmoothReveal>
        <div className="text-center mb-12">
          <h2 
            className="mb-4"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 600,
              color: 'var(--foreground)',
              letterSpacing: '-0.025em',
            }}
          >
            {title}
          </h2>
          {subtitle && (
            <p 
              style={{
                color: 'var(--foreground-muted)',
                fontSize: '1.125rem',
                maxWidth: '40rem',
                margin: '0 auto',
              }}
            >
              {subtitle}
            </p>
          )}
        </div>
      </SmoothReveal>

      <GlassCard elevation="high" className="max-w-3xl mx-auto p-8 md:p-12">
        {/* Progress indicator - subtle, elegant */}
        <div className="mb-12">
          <div className="flex justify-between mb-3">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className="flex-1 relative"
              >
                <div 
                  className={`
                    h-1 rounded-full transition-all duration-[var(--animation-duration-slow)]
                    ${index < steps.length - 1 ? 'mr-2' : ''}
                  `}
                  style={{
                    background: isStepComplete(step.id) 
                      ? 'var(--primary)' 
                      : 'var(--border)',
                  }}
                />
              </div>
            ))}
          </div>
          <p 
            className="text-center transition-all duration-300"
            style={{
              color: 'var(--foreground-subtle)',
              fontSize: '0.875rem',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            {Object.keys(values).length} of {steps.length} complete
          </p>
        </div>

        {/* Steps - flowing, not separated */}
        <div className="space-y-8">
          {steps.map((step, index) => (
            <SmoothReveal key={step.id} delay={index * 100}>
              <div className="relative">
                {/* Step number - subtle ornament */}
                <div 
                  className="absolute -left-16 top-4 hidden md:block"
                  style={{
                    color: 'var(--foreground-subtle)',
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '3rem',
                    fontWeight: 300,
                    opacity: 0.2,
                  }}
                >
                  {(index + 1).toString().padStart(2, '0')}
                </div>

                <div>
                  <label 
                    className="block mb-3"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '1.5rem',
                      fontWeight: 600,
                      color: 'var(--foreground)',
                    }}
                  >
                    {step.label}
                  </label>
                  
                  {step.description && (
                    <p 
                      className="mb-4"
                      style={{
                        color: 'var(--foreground-muted)',
                        fontSize: '0.9375rem',
                      }}
                    >
                      {step.description}
                    </p>
                  )}

                  {step.type === 'select' && step.options ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {step.options.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleValueChange(step.id, option)}
                          className={`
                            px-6 py-4 rounded-[var(--radius)]
                            transition-all duration-[var(--animation-duration-slow)]
                            ${values[step.id] === option 
                              ? 'bg-[var(--primary)] text-white shadow-[0_4px_16px_rgba(200,74,71,0.25)]' 
                              : 'bg-[var(--background-elevated)] text-[var(--foreground)] hover:bg-[var(--primary-soft)]'
                            }
                          `}
                          style={{
                            border: values[step.id] === option 
                              ? 'none' 
                              : '1px solid var(--border)',
                          }}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="relative">
                      <PremiumInput
                        type={step.type}
                        value={values[step.id] || ''}
                        onChange={(e) => handleValueChange(step.id, e.target.value)}
                        placeholder="Enter value"
                      />
                      {step.unit && values[step.id] && (
                        <div 
                          className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none"
                          style={{
                            color: 'var(--foreground-muted)',
                            fontSize: '0.875rem',
                          }}
                        >
                          {step.unit}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </SmoothReveal>
          ))}
        </div>

        {/* Calculate button - appears when ready */}
        {allStepsComplete && (
          <div className="mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <PremiumButton
              variant="primary"
              size="lg"
              onClick={handleCalculate}
              className="w-full"
            >
              Calculate
            </PremiumButton>
          </div>
        )}

        {/* Result - elegant reveal */}
        {result !== null && (
          <div className="mt-12 pt-12 border-t animate-in fade-in slide-in-from-bottom-6 duration-1000" style={{ borderColor: 'var(--border)' }}>
            <div className="text-center">
              <p 
                className="mb-3"
                style={{
                  color: 'var(--foreground-muted)',
                  fontSize: '0.875rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                {resultLabel}
              </p>
              <p 
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(3rem, 6vw, 5rem)',
                  fontWeight: 600,
                  color: 'var(--primary)',
                  letterSpacing: '-0.02em',
                }}
              >
                {result}
              </p>
            </div>
          </div>
        )}
      </GlassCard>
    </div>
  );
}
