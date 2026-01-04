import React, { useState } from 'react';
import { ArrowLeft, Delete, Equal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CalculatorAgent() {
    const navigate = useNavigate();
    const [display, setDisplay] = useState('0');
    const [equation, setEquation] = useState('');

    const handleNumber = (num) => {
        setDisplay(display === '0' ? num : display + num);
    };

    const handleOperator = (op) => {
        setEquation(display + ' ' + op + ' ');
        setDisplay('0');
    };

    const calculate = () => {
        try {
            const result = eval(equation + display); // Simple eval for demo purposes
            setDisplay(String(result));
            setEquation('');
        } catch (e) {
            setDisplay('Error');
        }
    };

    const clear = () => {
        setDisplay('0');
        setEquation('');
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 font-sans">
            <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">

                {/* Header */}
                <div className="bg-emerald-600 p-4 flex items-center justify-between text-white">
                    <button onClick={() => navigate('/')} className="p-2 hover:bg-emerald-700 rounded-full transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="font-semibold tracking-wide">Calculator</h1>
                    <div className="w-9" /> {/* Spacer */}
                </div>

                {/* Display */}
                <div className="bg-slate-900 p-6 text-right">
                    <div className="text-slate-400 text-sm h-6 mb-1">{equation}</div>
                    <div className="text-white text-4xl font-light tracking-wider truncate">{display}</div>
                </div>

                {/* Keypad */}
                <div className="p-4 grid grid-cols-4 gap-3 bg-white">
                    {['C', '(', ')', '/'].map((btn) => (
                        <button
                            key={btn}
                            onClick={() => btn === 'C' ? clear() : handleNumber(btn)} // simplified for demo
                            className="h-14 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors text-lg"
                        >
                            {btn}
                        </button>
                    ))}
                    {[7, 8, 9, '*'].map((btn) => (
                        <button
                            key={btn}
                            onClick={() => typeof btn === 'number' ? handleNumber(String(btn)) : handleOperator(btn)}
                            className={`h-14 rounded-full font-medium transition-colors text-xl ${typeof btn === 'number' ? 'bg-white hover:bg-slate-50 border border-slate-100 text-slate-800' : 'bg-slate-100 hover:bg-slate-200 text-emerald-600'
                                }`}
                        >
                            {btn}
                        </button>
                    ))}
                    {[4, 5, 6, '-'].map((btn) => (
                        <button
                            key={btn}
                            onClick={() => typeof btn === 'number' ? handleNumber(String(btn)) : handleOperator(btn)}
                            className={`h-14 rounded-full font-medium transition-colors text-xl ${typeof btn === 'number' ? 'bg-white hover:bg-slate-50 border border-slate-100 text-slate-800' : 'bg-slate-100 hover:bg-slate-200 text-emerald-600'
                                }`}
                        >
                            {btn}
                        </button>
                    ))}
                    {[1, 2, 3, '+'].map((btn) => (
                        <button
                            key={btn}
                            onClick={() => typeof btn === 'number' ? handleNumber(String(btn)) : handleOperator(btn)}
                            className={`h-14 rounded-full font-medium transition-colors text-xl ${typeof btn === 'number' ? 'bg-white hover:bg-slate-50 border border-slate-100 text-slate-800' : 'bg-slate-100 hover:bg-slate-200 text-emerald-600'
                                }`}
                        >
                            {btn}
                        </button>
                    ))}
                    <button onClick={() => handleNumber('0')} className="h-14 col-span-2 rounded-full bg-white hover:bg-slate-50 border border-slate-100 text-slate-800 font-medium transition-colors text-xl">0</button>
                    <button onClick={() => handleNumber('.')} className="h-14 rounded-full bg-white hover:bg-slate-50 border border-slate-100 text-slate-800 font-medium transition-colors text-xl">.</button>
                    <button onClick={calculate} className="h-14 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition-colors text-xl flex items-center justify-center shadow-lg shadow-emerald-200">
                        <Equal className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>
    );
}
