import { useState, useEffect } from 'react';
import { LineChart, Line, ReferenceLine, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useScrollReveal } from '../../hooks/useScrollReveal';

// Generate capacity data outside component to prevent re-randomization
const weeks = Array.from({ length: 26 }, (_, i) => `W${i + 1}`);

function genCapacity(base, variance, spike) {
  return weeks.map((w, i) => ({
    week: w,
    value: parseFloat(Math.min(100, Math.max(20,
      base + Math.sin(i * 0.4) * variance + 
      (i === spike ? 22 : 0) + (Math.random() * 8 - 4)
    )).toFixed(1))
  }));
}

const machineData = genCapacity(72, 14, 18);
const peopleData = genCapacity(81, 10, 12);
const printerData = genCapacity(58, 18, 21);

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;
  const value = payload[0].value;
  const color = value >= 90 ? '#ef4444' : value >= 75 ? '#f97316' : '#22c55e';
  
  return (
    <div style={{
      background: '#1A1A1A',
      border: '1px solid #E0DDD8',
      padding: '8px 12px',
      borderRadius: 6,
      fontFamily: 'monospace',
      fontSize: 11,
    }}>
      <div style={{ color: '#9A9A8A', marginBottom: 4 }}>{payload[0].payload.week}</div>
      <div style={{ color, fontWeight: 600 }}>{value}%</div>
    </div>
  );
};

const CapacityChart = ({ title, current, status, data, color }) => {
  const statusColors = {
    Safe: '#22c55e',
    Warning: '#f97316',
    Critical: '#ef4444',
  };

  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid #E0DDD8',
      borderRadius: 8,
      padding: '20px',
      flex: 1,
    }}>
      <div style={{
        fontSize: 10,
        fontFamily: 'monospace',
        color: '#9A9A8A',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        marginBottom: 8,
      }}>
        {title}
      </div>
      <div style={{
        fontSize: 32,
        fontFamily: 'monospace',
        color: '#1A1A1A',
        fontWeight: 600,
        marginBottom: 8,
      }}>
        {current}
      </div>
      <div style={{
        display: 'inline-block',
        padding: '4px 10px',
        borderRadius: 12,
        fontSize: 9,
        fontFamily: 'monospace',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        background: `${statusColors[status]}15`,
        color: statusColors[status],
        marginBottom: 12,
      }}>
        {status}
      </div>
      <div style={{
        fontSize: 9,
        fontFamily: 'monospace',
        color: '#9A9A8A',
        marginBottom: 12,
      }}>
        26-week utilization forecast
      </div>
      <ResponsiveContainer width="100%" height={100}>
        <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
          <XAxis 
            dataKey="week" 
            tick={{ fontSize: 9, fontFamily: 'monospace', fill: '#9A9A8A' }}
            tickLine={false}
            axisLine={false}
            interval={4}
          />
          <YAxis 
            tick={{ fontSize: 9, fontFamily: 'monospace', fill: '#9A9A8A' }}
            tickLine={false}
            axisLine={false}
            domain={[0, 100]}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={90} stroke="#ef4444" strokeDasharray="3 3" strokeWidth={1} />
          <ReferenceLine y={75} stroke="#f97316" strokeDasharray="3 3" strokeWidth={1} />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={color} 
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default function EdenDashboard() {
  const [ref, isVisible] = useScrollReveal(0.2);
  const [currentTime] = useState(() => {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  });

  // Backup pipeline animation
  const [activeStage, setActiveStage] = useState(-1);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    let stage = 0;
    const interval = setInterval(() => {
      if (stage < 5) {
        setActiveStage(stage);
        stage++;
      } else {
        setDone(true);
        setTimeout(() => {
          setDone(false);
          setActiveStage(-1);
          stage = 0;
        }, 3500);
      }
    }, 700);

    return () => clearInterval(interval);
  }, [isVisible]);

  const activities = [
    { time: '14:09', type: 'update', text: 'Cavity inventory updated', user: 'Molder Line 3' },
    { time: '13:52', type: 'create', text: 'New Part registered', user: 'Engineering' },
    { time: '13:41', type: 'update', text: 'Tool record modified', user: 'Tool Room' },
    { time: '13:30', type: 'system', text: 'Capacity recalculated', user: 'System' },
    { time: '12:55', type: 'backup', text: 'Backup completed', user: 'System' },
  ];

  const activityColors = {
    backup: '#22c55e',
    system: '#9A9A8A',
    create: '#C8470D',
    update: '#1A1A1A',
  };

  const stages = [
    { icon: '⬡', label: 'SQL Server', sublabel: '56 tables · 34,523 rows' },
    { icon: '↓', label: 'Dump Script', sublabel: 'Python · Pandas' },
    { icon: '⟳', label: 'Compress', sublabel: 'Delta · ~3.5 MB' },
    { icon: '☁', label: 'OneDrive', sublabel: 'Auto-upload' },
    { icon: '✓', label: 'Verified', sublabel: 'Integrity check' },
  ];

  return (
    <div ref={ref} style={{
      maxWidth: 860,
      margin: '0 auto',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
      transition: 'opacity 600ms ease-out, transform 600ms ease-out',
    }}>
      {/* Section 1 - Header */}
      <div style={{
        background: '#1A1A1A',
        padding: '16px 24px',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: '#22c55e',
            animation: 'pulse 1.5s ease-in-out infinite',
          }} />
          <span style={{
            fontFamily: 'monospace',
            fontSize: 14,
            color: '#F5F2EE',
            fontWeight: 600,
            letterSpacing: '0.05em',
          }}>
            EDEN
          </span>
          <span style={{
            fontFamily: 'monospace',
            fontSize: 11,
            color: '#9A9A8A',
          }}>
            Decoration Dept · Capacity Planning
          </span>
        </div>
        <div style={{
          fontFamily: 'monospace',
          fontSize: 11,
          color: '#9A9A8A',
        }}>
          Last updated {currentTime}
        </div>
      </div>

      {/* Section 2 - Stats Bar */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #E0DDD8',
        borderTop: 'none',
        display: 'flex',
        padding: '20px 0',
      }}>
        {[
          { value: '34,523', label: 'Total Records' },
          { value: '498', label: 'Objects' },
          { value: '597', label: 'Part Numbers' },
          { value: '18,326', label: 'Cavity Records' },
          { value: '4,663', label: 'Created /30d' },
          { value: '56', label: 'DB Tables' },
        ].map((stat, i) => (
          <div key={i} style={{ flex: 1, textAlign: 'center', position: 'relative' }}>
            {i > 0 && (
              <div style={{
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 1,
                height: 40,
                background: '#E0DDD8',
              }} />
            )}
            <div style={{
              fontFamily: 'monospace',
              fontSize: 24,
              fontWeight: 600,
              color: '#1A1A1A',
              marginBottom: 4,
            }}>
              {stat.value}
            </div>
            <div style={{
              fontFamily: 'monospace',
              fontSize: 9,
              color: '#9A9A8A',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Section 3 - Capacity Charts */}
      <div style={{
        display: 'flex',
        gap: 16,
        padding: '16px 0',
      }}>
        <CapacityChart 
          title="Machine Capacity"
          current="78%"
          status="Safe"
          data={machineData}
          color="#C8470D"
        />
        <CapacityChart 
          title="People Capacity"
          current="94%"
          status="Warning"
          data={peopleData}
          color="#1A1A1A"
        />
        <CapacityChart 
          title="Printer Inventory"
          current="61%"
          status="Safe"
          data={printerData}
          color="#9A9A8A"
        />
      </div>

      {/* Section 4 - Bottom Row */}
      <div style={{
        display: 'flex',
        gap: 16,
        marginTop: 16,
      }}>
        {/* Recent Activity */}
        <div style={{
          flex: 1,
          background: '#ffffff',
          border: '1px solid #E0DDD8',
          borderRadius: 8,
          padding: 20,
        }}>
          <div style={{
            fontSize: 10,
            fontFamily: 'monospace',
            color: '#9A9A8A',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: 16,
          }}>
            Recent Activity
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {activities.map((activity, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}>
                <span style={{
                  fontFamily: 'monospace',
                  fontSize: 11,
                  color: '#9A9A8A',
                  minWidth: 38,
                }}>
                  {activity.time}
                </span>
                <div style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: activityColors[activity.type],
                  flexShrink: 0,
                }} />
                <span style={{
                  fontFamily: 'monospace',
                  fontSize: 11,
                  color: '#1A1A1A',
                  flex: 1,
                }}>
                  {activity.text}
                </span>
                <span style={{
                  fontFamily: 'monospace',
                  fontSize: 10,
                  color: '#9A9A8A',
                }}>
                  {activity.user}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Backup Pipeline */}
        <div style={{
          flex: 1,
          background: '#1A1A1A',
          border: '1px solid #2a2a2a',
          borderRadius: 8,
          padding: 20,
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
          }}>
            <div style={{
              fontSize: 10,
              fontFamily: 'monospace',
              color: '#9A9A8A',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}>
              Automated Backup Pipeline
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: done ? '#22c55e' : '#f97316',
                animation: 'pulse 1.5s ease-in-out infinite',
              }} />
              <span style={{
                fontFamily: 'monospace',
                fontSize: 9,
                color: done ? '#22c55e' : '#f97316',
              }}>
                {done ? `Protected · ${currentTime}` : 'Running'}
              </span>
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            {stages.map((stage, i) => {
              const isActive = i === activeStage;
              const isPassed = i < activeStage || done;
              const isComplete = done && i === 4;

              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{
                      width: 38,
                      height: 38,
                      borderRadius: 8,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 16,
                      border: '1.5px solid',
                      borderColor: isComplete ? '#22c55e' : isActive || isPassed ? '#C8470D' : '#2a2a2a',
                      background: isComplete ? '#22c55e15' : isActive || isPassed ? '#C8470D15' : '#2a2a2a',
                      color: isComplete ? '#22c55e' : isActive || isPassed ? '#C8470D' : '#9A9A8A',
                      transform: isActive ? 'scale(1.12)' : 'scale(1)',
                      transition: 'all 300ms ease-out',
                    }}>
                      {stage.icon}
                    </div>
                    <div style={{
                      fontSize: 9,
                      fontFamily: 'monospace',
                      color: isComplete ? '#22c55e' : isActive || isPassed ? '#F5F2EE' : '#9A9A8A',
                      marginTop: 6,
                      textAlign: 'center',
                    }}>
                      {stage.label}
                    </div>
                    <div style={{
                      fontSize: 8,
                      fontFamily: 'monospace',
                      color: '#9A9A8A',
                      marginTop: 2,
                      textAlign: 'center',
                      maxWidth: 80,
                    }}>
                      {stage.sublabel}
                    </div>
                  </div>
                  {i < stages.length - 1 && (
                    <div style={{
                      width: 12,
                      height: 1,
                      background: isPassed || done ? '#C8470D' : '#2a2a2a',
                      margin: '0 4px',
                      marginBottom: 50,
                      transition: 'background 300ms ease-out',
                    }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Section 5 - Footer */}
      <div style={{
        background: '#F5F2EE',
        border: '1px solid #E0DDD8',
        borderTop: 'none',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        padding: '12px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
      }}>
        <div style={{
          fontFamily: 'monospace',
          fontSize: 10,
          color: '#9A9A8A',
        }}>
          Data anonymized. Production system actively used by 5+ engineers daily.
        </div>
        <div style={{
          fontFamily: 'monospace',
          fontSize: 10,
          color: '#C8470D',
        }}>
          PT Mattel Indonesia · 2025
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
